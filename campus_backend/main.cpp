#include "splashkit.h"
#include "campus_data.h"
#include "campus_logic.h"

using std::stoi;
using std::string;
using std::to_string;

int main()
{
    int current_time;
    int user_choice;

    write_line("Welcome to Campus Navigation Assistant!");
    write_line("Enter current time (0-23): ");
    current_time = stoi(read_line());

    if (current_time < 0) current_time = 0;
    if (current_time > 23) current_time = 23;

    write_line("1. View all buildings");
    write_line("2. Building information");
    write_line("3. Building facilities");
    write_line("4. Open/Closed status");
    write_line("5. Directions");
    write_line("6. Search by facility");
    write_line("7. Exit");

    user_choice = stoi(read_line());

    if (user_choice == 1)
    {
        for (int i = 0; i < NUM_BUILDINGS; i++)
            write_line(to_string(i + 1) + ". " + building_names[i]);
    }

    else if (user_choice == 4)
    {
        for (int i = 0; i < NUM_BUILDINGS; i++)
        {
            write_line(
                building_names[i] + ": " +
                (is_building_open(i, current_time) ? "OPEN" : "CLOSED")
            );
        }
    }

    else if (user_choice == 5)
    {
        write_line("Enter start building:");
        int from = stoi(read_line()) - 1;

        write_line("Enter destination building:");
        int to = stoi(read_line()) - 1;

        write_line("Distance: " + to_string(calculate_distance(from, to)) + " units");
        write_line("Walking time: " + to_string(calculate_walking_time(from, to)) + " minutes");
    }

    write_line("Press Enter to exit...");
    read_line();
    return 0;
}
