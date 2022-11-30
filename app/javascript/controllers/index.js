// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import ControllerController from "./controller_controller"
application.register("controller", ControllerController)

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import PatternController from "./pattern_controller"
application.register("pattern", PatternController)

import ShapeController from "./shape_controller"
application.register("shape", ShapeController)
