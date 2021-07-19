# pAWS | Dependency Checker (Frontend)

Frontend application which allows users to enter their dependencies and view the results of their vulnerability scans.

<br />

## Developer Guide

### How to run:
1. Change into the correct directory - ```cd ./```
2. Ensure that there isn't an existing node_modules by running ```rm -rf node_modules```
3. Install the required node modules - ```npm install```
4. Start the app - ```npm start```
5. The app should be runnning on ```localhost:3000```

### Running with Docker:
1. Install Docker on your machine by following this [guide](https://docs.docker.com/desktop/)
2. Change to the root directory - e.g. webapp-frontend
3. Run docker-compose to built the image and start the container
    ```
    docker-compose up
    ```
3. If you make changes, ensure you rebuild the image to see the changes by running:
    ```
    docker-compose up --build
    ```

### Using eslint:
Eslint is a linter that can help to tidy up your cody and ensures everyone working on the project is practicing the same coding standards. It helps to make the code readable and easy for everyone to understand.

#### Checking for errors:
    npx eslint ./src

#### Fixing all auto-fixable errors:
    npx eslint ./src --fix
