# Seesaw Simulation

An interactive physics-based seesaw built with plain JavaScript, HTML, and CSS.
Click anywhere on the plank to drop weighted objects and watch the seesaw respond in real time.

## Technologies

- JavaScript
- HTML
- CSS

-This project was built using only pure JavaScript, HTML, and CSS, without any external libraries, frameworks, or canvas.

## Thought Process & Design Decisions

The project was initiated by sketching the overall structure on paper to clearly define the layout and core logic before writing any code. This approach helped visualize the seesaw structure, pivot positioning, and user interaction flow.

After outlining the basic structure, the core simulation mechanics were implemented step by step:

1. The visual layout of the plank and pivot was created.
2. The clickable area was restricted strictly to the plank.
3. The distance from the pivot was calculated to determine left and right sides.
4. The torque formula was applied:

   `torque = weight × distance`

5. The tilt angle was computed using:

   `angle = (rightTorque - leftTorque) / 10`

6. The tilt angle was clamped between -30° and +30° to ensure realistic limits.
7. Smooth CSS transitions were added to create a natural balancing effect.
8. LocalStorage was implemented to preserve the simulation state after page refresh.

After establishing the core functionality, the project was incrementally expanded to fully meet the given requirements and improve user experience, including weight indicators, reset functionality, and refined UI structure.

## Core Logic

- Each object has a random weight between 1–10 kg.
- Objects appear exactly where the user clicks.
- Torque is recalculated on every new object.
- The plank rotates proportionally to torque difference.
- Angle is clamped between -30° and +30°.
- Total weight on each side is displayed.
- State is saved and restored via LocalStorage.

## UI Decisions

The frontend design was inspired by Tetris, particularly its block-based structure. This influence is reflected in the square object design and minimal visual style of the interface.

- Seesaw is wrapped in a bordered frame to isolate the simulation
- Info metrics sit above the seesaw, next weight floats in the corner
- Drop log below the reset button records every placed object
- Object size scales with weight for visual clarity
- Colors are generated dynamically via HSL based on weight value

## Trade-offs & Limitations

- Physics simulation is simplified (no inertia, friction, or real mass distribution).
- Distance calculation is based on pixel distance rather than real-world units.
- Objects do not slide dynamically along the plank.

## AI Usage

AI tools were used only for:

- Syntax clarification
- Minor debugging
- Documentation formatting


## Live Demo

https://erdemyagsagan.github.io/metinerdem-yagsagan-seesaw/

## Repository

https://github.com/erdemyagsagan/metinerdem-yagsagan-seesaw
