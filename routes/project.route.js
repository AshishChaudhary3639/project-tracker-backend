const { Router } = require("express");
const { authentication } = require("../middleware/authentication");
const { ProjectModel } = require("../models/project.model");

const projectRoute = Router();

// Project data storing into Database
projectRoute.post("/createproject", authentication, async (req, res) => {
  let project = req.body;
  try {
    let data = new ProjectModel(project);
    await data.save();
    res.send({ success: "project add successfuly" });
  } catch (error) {
    res.send({ err: "something went wrong" });
  }
});

projectRoute.get("/getprojects", authentication, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const selectedVal = req.query.selectedVal || "projectName";
  const perPage = 10;

  try {
    const count = await ProjectModel.countDocuments(); // Total number of items
    const totalPages = Math.ceil(count / perPage);
    let sortOption = {};

    sortOption[selectedVal] = 1;
    const projects = await ProjectModel.find()
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      projects,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

projectRoute.patch("/getprojects/:id", authentication, async (req, res) => {
  const id = req.params.id;
  const valueToUpdate = req.body.statusVal;
  console.log(id, valueToUpdate);
  try {
    await ProjectModel.findByIdAndUpdate(id, { status: valueToUpdate });
    res.send({ success: "Updated" });
  } catch (error) {
    console.log(error);
    res.send({ err: "something went wrong" });
  }
});

projectRoute.get("/search", authentication, async (req, res) => {
  const val = req.query.query;
  try {
    let projects = await ProjectModel.find({
      $or: [
        { projectName: { $regex: val, $options: "i" } },
        { type: { $regex: val, $options: "i" } },
        { division: { $regex: val, $options: "i" } },
        { category: { $regex: val, $options: "i" } },
        { priority: { $regex: val, $options: "i" } },
        { location: { $regex: val, $options: "i" } },
      ],
    });
    res.send(projects);
  } catch (error) {
    res.send({ err: "something went wrong" });
  }
});
module.exports = { projectRoute };
