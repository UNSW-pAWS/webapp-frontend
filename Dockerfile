FROM node:13.12.0-alpine

# Create working directory
WORKDIR /app

# Add node_modules dir to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install packages
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

# Copy application files
COPY . ./

# Start command
CMD ["npm", "start"]