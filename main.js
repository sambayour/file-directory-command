class Directory {
  constructor(name) {
    this.name = name;
    this.children = {};
  }

  create(path) {
    const parts = path.split("/");
    let current = this;
    for (const part of parts) {
      if (!current.children[part]) {
        current.children[part] = new Directory(part);
      }
      current = current.children[part];
    }
  }

  list(indent = "") {
    console.log(`${indent}${this.name}`);
    for (const [name, child] of Object.entries(this.children)) {
      if (child instanceof Directory) {
        // Check if child is an instance of Directory
        child.list(indent + "  ");
      }
    }
  }

  move(source, destination) {
    const sourceParts = source.split("/");
    const sourceName = sourceParts.pop();
    const sourceParent = sourceParts.join("/");
    const sourceDir = this.find(sourceParent);
    if (!sourceDir) {
      console.log(`Cannot move ${source} - source does not exist`);
      return;
    }

    const destinationParts = destination.split("/");
    const destinationParent = destinationParts.join("/");
    const destinationDir = this.find(destinationParent);
    if (!destinationDir) {
      console.log(
        `Cannot move ${source} to ${destination} - destination does not exist`
      );
      return;
    }

    const movedDir = new Directory(sourceName);
    movedDir.children = sourceDir.children[sourceName];
    delete sourceDir.children[sourceName];
    destinationDir.children[sourceName] = movedDir;
  }

  delete(path) {
    const target = this.find(path);
    if (!target) {
      console.log(`Cannot delete ${path} - directory does not exist`);
      return;
    }

    const parentPath = path.split("/").slice(0, -1).join("/");
    const parent = this.find(parentPath);
    if (parent) {
      delete parent.children[target.name];
    }
  }

  //method to loop through the directories
  find(path) {
    let current = this;
    const parts = path.split("/");
    for (const part of parts) {
      if (!current.children[part]) {
        return null;
      }
      current = current.children[part];
    }
    return current;
  }
}

const root = new Directory("");

//list of command that i worked with
const commands = [
  "CREATE fruits",
  "CREATE vegetables",
  "CREATE grains",
  "CREATE fruits/apples",
  "CREATE fruits/apples/fuji",
  "LIST",
  "CREATE grains/squash",
  "MOVE grains/squash vegetables",
  "CREATE foods",
  "MOVE grains foods",
  "MOVE fruits foods",
  "MOVE vegetables foods",
  "LIST",
  "DELETE fruits/apples",
  "DELETE foods/fruits/apples",
  "LIST",
];

//loop through the commands
for (const command of commands) {
  const parts = command.split(" ");
  const action = parts[0];
  if (action === "CREATE") {
    root.create(parts[1]);
  } else if (action === "LIST") {
    root.list();
  } else if (action === "MOVE") {
    const source = parts[1];
    const destination = parts[2];
    root.move(source, destination);
  } else if (action === "DELETE") {
    const path = parts[1];
    root.delete(path);
  }
}
