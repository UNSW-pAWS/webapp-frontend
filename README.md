# pAWS | Application Configuration Tool

<br/>

<p align="center">
  <img width="200" src="./static/logo.png">
</p>


<br/>
<br/>

ReactJS application which allows users to quickly create their application's architecture diagram and specify their configuration. This tool put security at the forefront and also allows users to select what AWS Managed Rules they want to be guided by.

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


### Deployment
The tool has been deployed onto AWS using AWS Amplify. To deploy, follow the steps below:

1. Run the below command in the repository's directory.
    ```    
    cd ./
    set DISABLE_ESLINT_PLUGIN=true
    npm run build
    ```
2. Go to the AWS Console and navigate to the AWS Amplify dashboard
3. Click <b>New app</b> and <b>Host web app</b>
4. Select <b>Deploy without a Git provider</b>
5. Drag and drop your ```./build``` directory into the Console
6. Select <b>Save and Deploy</b>
7. Your app should be ready to access now!
