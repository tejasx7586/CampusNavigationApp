#pragma once
#include <string>
#include <vector>

bool is_building_open(int building_id, int time);
int calculate_distance(int from, int to);
std::vector<std::string> get_facilities(int building_id);
std::vector<int> search_by_facility(int facility_bit);
int calculate_walking_time(int from, int to);