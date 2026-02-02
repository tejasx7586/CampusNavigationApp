#pragma once
#include <string>

const int NUM_BUILDINGS = 13;

extern std::string building_names[NUM_BUILDINGS];
extern int building_x[NUM_BUILDINGS];
extern int building_y[NUM_BUILDINGS];
extern int opening_hours[NUM_BUILDINGS];
extern int closing_hours[NUM_BUILDINGS];
extern int facilities[NUM_BUILDINGS];
extern double building_lat[];
extern double building_lng[];



enum Facility
{
    WIFI            = 1 << 0,  // 1
    LIBRARY         = 1 << 1,  // 2
    CAFE            = 1 << 2,  // 4
    STUDY_AREA      = 1 << 3,  // 8
    PRINTER         = 1 << 4,  // 16
    COMPUTERS       = 1 << 5,  // 32
    PARKING         = 1 << 6,  // 64
    GYM             = 1 << 7,  // 128
    STUDENT_SUPPORT = 1 << 8   // 256
};