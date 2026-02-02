#include "campus_data.h"

std::string building_names[NUM_BUILDINGS] = {
    "Building_B : Student Service for International Students",
    "Building_W : Clinical Simulation Center",
    "Building_Y : Faculty of health",
    "Building_J : Exercise, Nutrition and Sport science",
    "Building_U : Indoor Exercise",
    "Building_X : Lecture Theatre",
    "Building_I : Hall and Tutorial Room",
    "Building_FA : Art Gallery",
    "Building_V : Library",
    "Building_H : Learning Space",
    "Building_BC : Burwood Corporate Center",
    "Building_A : Student Association Hub",
    "Building_P : Studio building"
};
double building_lat[NUM_BUILDINGS] = {
  -37.8475, -37.8480, -37.8469, -37.8478,
  -37.8483, -37.8465, -37.8468, -37.8471,
  -37.8462, -37.8489, -37.8492, -37.8470,
  -37.8460
};

double building_lng[NUM_BUILDINGS] = {
  145.1152, 145.1160, 145.1145, 145.1138,
  145.1141, 145.1159, 145.1163, 145.1135,
  145.1167, 145.1149, 145.1139, 145.1154,
  145.1140
};


int building_x[NUM_BUILDINGS] = {5,4,4,1,1,9,12,1,9,10,10,9,1};
int building_y[NUM_BUILDINGS] = {9,6,4,7,5,10,10,13,12,6,2,8,10};

int opening_hours[NUM_BUILDINGS] = {9,8,8,7,6,8,9,10,8,9,9,8,7};
int closing_hours[NUM_BUILDINGS] = {17,20,18,22,23,22,21,17,23,17,17,22,21};

int facilities[NUM_BUILDINGS] = {
    WIFI | STUDY_AREA,                                   // Building_B
    WIFI | GYM | STUDENT_SUPPORT,                        // Building_W
    WIFI | GYM | STUDENT_SUPPORT,                        // Building_Y
    WIFI | GYM,                                          // Building_J
    GYM,                                                 // Building_U
    WIFI | PRINTER,                                     // Building_X
    WIFI | PRINTER | COMPUTERS,                          // Building_I
    WIFI,                                                // Building_FA
    WIFI | LIBRARY | STUDENT_SUPPORT,                    // Building_V
    WIFI | STUDY_AREA | PRINTER,                         // Building_H
    WIFI | LIBRARY | STUDENT_SUPPORT,                    // Building_BC
    WIFI | STUDY_AREA | STUDENT_SUPPORT,                 // Building_A
    WIFI | CAFE                                         // Building_P
};
