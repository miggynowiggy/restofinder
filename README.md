# RestoFinder

A React app that shows you the restaurants around Cebu, Philippines.

## Features

- See locations of all restos in Cebu.
- Sort restaurants by ratings.
- Draw a circle or rectangle in the map to restos within the shape.
- See directions on how to get there based on your current location.

### Technologies Used

- React 18
- Ant Design V5
- Google Maps API
- Yarn (package manager) `npm install -g yarn`

### Installation

1. Install packages `yarn install`
2. Create a `.env` file in the root folder and copy the contents of `.env.example`
3. In Google Cloud Platform, create an API key and supply it to the `.env`'s: `VITE_GOOGLE_MAPS_API` environement variable. [GUIDE](https://developers.google.com/maps/documentation/embed/get-api-key#:~:text=Go%20to%20the%20Google%20Maps%20Platform%20%3E%20Credentials%20page.&text=On%20the%20Credentials%20page%2C%20click,Click%20Close.)
4. Run dev server: `yarn dev`
