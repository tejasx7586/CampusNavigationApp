#include "campus_logic.h"
#include "campus_data.h"
#include <vector>
#include <string>

bool is_building_open(int id, int time)
{
    return time >= opening_hours[id] && time < closing_hours[id];
}

int calculate_distance(int from, int to)
{
    return abs(building_x[to] - building_x[from]) +
           abs(building_y[to] - building_y[from]);
}
int calculate_walking_time(int from, int to)
{
    int distance = calculate_distance(from, to);
    return distance * 2;
}

std::vector<std::string> get_facilities(int id)
{
    std::vector<std::string> result;
    int f = facilities[id];

    if (f & 1) result.push_back("WiFi");
    if (f & 2) result.push_back("Library");
    if (f & 4) result.push_back("Cafe");
    if (f & 8) result.push_back("Study Area");
    if (f & 16) result.push_back("Printer");
    if (f & 32) result.push_back("Computers");
    if (f & 64) result.push_back("Parking");
    if (f & 128) result.push_back("Gym");
    if (f & 256) result.push_back("Student Support");

    return result;
}

std::vector<int> search_by_facility(int bit)
{
    std::vector<int> result;
    for (int i = 0; i < NUM_BUILDINGS; i++)
        if (facilities[i] & bit)
            result.push_back(i);
    return result;
}
