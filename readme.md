# File Directory Command

This project implements a simple directory management system in JavaScript using a class-based approach. The system allows users to create, move, delete, and list directories within a virtual file system.

## Features

- Create directories
- Move directories within the file system
- Delete directories
- List directories and subdirectories

## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:sambayour/file-directory-command.git
   ```

2. Change to project directory

   ```bash
   cd file-directory-command
   ```

3. Run the project with the command below

   ```bash
   node main.js
   ```

The following are example commands that can be used to demonstrate the functionality of the directory management system:

        CREATE fruits
        CREATE vegetables
        CREATE grains
        CREATE fruits/apples
        CREATE fruits/apples/fuji
        LIST
        CREATE grains/squash
        MOVE grains/squash vegetables
        CREATE foods
        MOVE grains foods
        MOVE fruits foods
        MOVE vegetables foods
        LIST
        DELETE fruits/apples
        DELETE foods/fruits/apples
        LIST
