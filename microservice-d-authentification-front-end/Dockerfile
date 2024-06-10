FROM node:20.12.2-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]





# Use an official Node.js runtime as a parent image
# FROM node:20.12.2-alpine

# # Set the working directory to /app
# WORKDIR /app

# # Copy package.json and package-lock.json to /app
# COPY package*.json ./

# # Install app dependencies
# RUN npm install

# # Copy app source code to /app
# COPY . .

# # Build the app for production
# RUN npm run build --prod

# # Expose port 80 for the container
# EXPOSE 80

# # Start the app
# CMD ["npm", "start"]
















# # Stage 1: Compile and Build angular codebase

# # Use official node image as the base image
# FROM node:20.12.2-alpine as build

# # Set the working directory
# WORKDIR /usr/local/app

# # Add the source code to app
# COPY ./ /usr/local/app/

# # Install all the dependencies
# RUN npm install

# # Generate the build of the application
# RUN npm run build


# # Stage 2: Serve app with nginx server

# # Use official nginx image as the base image
# FROM nginx:latest

# # Copy the build output to replace the default nginx contents.
# COPY --from=build /usr/local/app/dist/microservice-d-authentification-front-end /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80