// Import the robotJS Library 
var robot = require("robotjs");

function main() {
    console.log("Starting...");
    sleep(4000);

    
    
    // Basic infinte loop, keeps the action repeating, Ctrl + C to end the script
    while (true) {
    var tree = findTree();
    // if the tree is not found, writes an error message and exits the loop
    if (tree == false) {
        console.log('Cannot locate tree');
        break;
    }

    // Chops down the first tree
    robot.moveMouseSmooth(tree.x, tree.y);
    robot.mouseClick();
    sleep(8000);
    
    
    dropLogs();

    // Chops down the second tree
    robot.moveMouseSmooth(second_tree_x, second_tree_y);
    robot.mouseClick();
    sleep(8000);

    
    dropLogs();
    }

    // calls function to drop specified inventory
    function dropLogs() {
        var inventory_x = 1306;
        var inventory_y = 573;
        // Interacts with inventory to drop the logs
        robot.moveMouseSmooth(inventory_x, inventory_y)
        robot.mouseClick("right");
        robot.moveMouseSmooth(inventory_x, inventory_y + 78);
        robot.mouseClick();
        sleep(1000);

    }

    console.log('Done..');
}

function testScreenCapture() {
   // taking a prelimnary screenshot to test this function, not part of the project
    var img = robot.screen.capture(2560, 1600);

    var pixel_color = img.colorAt(37,269);
    console.log(pixel_color)

}
function findTree() {
    var x = 300, y = 300,  width = 1300, height = 400;
    var img = robot.screen.capture(x, y, width, height); 

    var tree_colors = ["2f2110", "402d16", "563d1f", "281c0e", "231a0c"];
    for (var i = 0; i < 100; i++) {
        var random_x = getRandomInt(0, width-1);
        var random_y = getRandomInt(0, height-1);
        var sample_color = img.colorAt(random_x, random_y);

        if (tree_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Found a tree at: " + screen_x + ", " + screen_y + " color " + sample_color);
            return {x: screen_x, y: screen_y};
        }
    }   
    // did not find the color in our screenshot
    return false;

}


function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

main();