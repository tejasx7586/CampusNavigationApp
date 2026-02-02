#include <iostream>
#include "httplib.h"
#include "json.hpp"
#include "campus_data.h"
#include "campus_logic.h"
#include <string>
#include <unordered_map>

using json = nlohmann::json;

int facility_to_bit(const std::string &name)
{    static const std::unordered_map<std::string, int> map = {
        {"WiFi", WIFI},
        {"Library", LIBRARY},
        {"Cafe", CAFE},
        {"Study Area", STUDY_AREA},
        {"Printer", PRINTER},
        {"Computers", COMPUTERS},
        {"Parking", PARKING},
        {"Gym", GYM},
        {"Student Support", STUDENT_SUPPORT}};

    auto it = map.find(name);
    return it != map.end() ? it->second : -1;
}

int main()
{
    httplib::Server server;

    server.Get("/buildings", [](const httplib::Request &, httplib::Response &res)
{
    json buildings = json::array();

    for (int i = 0; i < NUM_BUILDINGS; i++) {
        buildings.push_back({
            {"id", i},
            {"name", building_names[i]},
            {"lat", building_lat[i]},
            {"lng", building_lng[i]}
        });
    }

    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_content(buildings.dump(), "application/json");
});

    server.Get("/building", [](const httplib::Request &req, httplib::Response &res)
               {
         if (!req.has_param("id")) {
        res.status = 400;
        res.set_content("Missing 'id' parameter", "text/plain");
        return;
        }

        int id;
        try {
            id = std::stoi(req.get_param_value("id"));
        } 
        catch (...) {
            res.status = 400;
            res.set_content("Invalid 'id' parameter", "text/plain");
            return;
        }

        if (id < 0 || id >= NUM_BUILDINGS) {
            res.status = 400;
            res.set_content("Invalid 'id' parameter", "text/plain");
            return;
        }

        json j = {
            {"id", id},
            {"name", building_names[id]},
            {"x", building_x[id]},
            {"y", building_y[id]},
            {"opening", opening_hours[id]},
            {"closing", closing_hours[id]},
            {"lat", building_lat[id]},
            {"lng", building_lng[id]},
        };

        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content(j.dump(), "application/json"); });




    server.Get("/directions", [](const httplib::Request &req, httplib::Response &res)
               {
      
        if(!req.has_param("from") || !req.has_param("to")) {
            res.status = 400;
            res.set_content("Missing `from` or `to` parameter", "text/plain");
            return;
        }


        int from = std::stoi(req.get_param_value("from"));
        int to   = std::stoi(req.get_param_value("to"));

        json j = {
        {"from", {
            {"id", from},
            {"name", building_names[from]},
            {"lat", building_lat[from]},
            {"lng", building_lng[from]}
        }},
        {"to", {
            {"id", to},
            {"name", building_names[to]},
            {"lat", building_lat[to]},
            {"lng", building_lng[to]}
        }}
    };

    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_content(j.dump(), "application/json");
});





    server.Get("/building/facilities", [](const httplib::Request &req, httplib::Response &res)
               {
    if (!req.has_param("id")) {
        res.status = 400;
        res.set_content("Missing 'id' parameter", "text/plain");
        return;
    }

    int id;
    try {
        id = std::stoi(req.get_param_value("id"));
    } catch (...) {
        res.status = 400;
        res.set_content("Invalid 'id' parameter", "text/plain");
        return;
    }

    if (id < 0 || id >= NUM_BUILDINGS) {
        res.status = 400;
        res.set_content("Building id out of range", "text/plain");
        return;
    }

    json j;
    j["building"] = building_names[id];
    j["facilities"] = get_facilities(id);

    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_content(j.dump(), "application/json"); });

    server.Get("/search/facility", [](const httplib::Request &req, httplib::Response &res)
               {
    if (!req.has_param("name")) {
        res.status = 400;
        res.set_content("Missing 'name' parameter", "text/plain");
        return;
    }

    std::string name = req.get_param_value("name");
    int bit = facility_to_bit(name);

    if (bit == -1) {
        res.status = 400;
        res.set_content("Unknown facility name", "text/plain");
        return;
    }

    json buildings = json::array();

    for (int id : search_by_facility(bit)) {
        buildings.push_back({
            {"id", id},
            {"name", building_names[id]}
        });
    }

    json response = {
        {"facility", name},
        {"buildings", buildings}
    };

    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_content(response.dump(), "application/json"); });

    server.Get("/status", [](const httplib::Request &req, httplib::Response &res)
               {
        if (!req.has_param("id") || !req.has_param("time")) {
        res.status = httplib::StatusCode::BadRequest_400;
        res.set_content("Missing 'id' or 'time' parameter", "text/plain");
        return;
    }

        int id = std::stoi(req.get_param_value("id"));
        int time = std::stoi(req.get_param_value("time"));

        bool open = is_building_open(id, time);

        json j = {
            {"id", id},
            {"name", building_names[id]},
            {"time", time},
            {"status", open ? "OPEN" : "CLOSED"}
        };

        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content(j.dump(), "application/json"); });

    server.Get("/", [](const httplib::Request &, httplib::Response &res)
               {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content("Campus Navigation API is running", "text/plain"); });

    std::cout << "Server running on port 7070\n";
    server.listen("0.0.0.0", 7070);
}









