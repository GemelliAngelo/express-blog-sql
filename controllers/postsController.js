// * DATABASE INPORT
const postsData = require("../data/postsData.js");

// # INDEX
function index(req, res) {
  // * variables
  const tag = req.query.tag ?? "";
  let filteredPost = postsData;

  // * if query exists
  if (tag) {
    filteredPost = postsData.filter((post) => {
      return post.categories.includes(tag);
    });
  }

  // * output
  res.json(filteredPost);
}

// # SHOW
function show(req, res) {
  // * variable
  const id = parseInt(req.params.id);

  // * managing error
  if (isNaN(id)) {
    const err = new Error("Id not valid");
    throw err;
  }

  // * variable
  const post = postsData.find((post) => post.id === id);

  // * managing error
  if (!post) {
    const err = new Error("Data not found");
    throw err;
  }

  // * output
  res.json(post);
}

// # STORE
function store(req, res) {
  // * variables
  const id = postsData.at(-1).id + 1;
  const { title, content, image, categories } = req.body;

  // * managing error
  if (!title || !content || !image || !categories?.length) {
    const err = new Error("Missing data not found");
    throw err;
  }

  // * variable
  const newPost = {
    id: id,
    title: title,
    content: content,
    image: image,
    categories: categories,
  };

  postsData.push(newPost);

  // * output
  console.log(postsData);
  res.status(204).json(postsData);
}

// # UPDATE
function update(req, res) {
  // * variable
  const id = parseInt(req.params.id);

  // * managing error
  if (isNaN(id)) {
    const err = new Error("Id not valid");
    throw err;
  }

  // * variable
  let post = postsData.find((post) => post.id === id);

  //  * managing error
  if (!post) {
    const err = new Error("Data not found");
    throw err;
  }

  // * variable
  const { title, content, image, categories } = req.body;

  // * managing error
  if (!title || !content || !image || !categories?.length) {
    const err = new Error("Missing data not found");
    throw err;
  }

  (post.id = id),
    (post.title = title),
    (post.content = content),
    (post.image = image),
    (post.categories = categories);

  // * output
  console.log(postsData);
  res.sendStatus(204);
}

// # MODIFY
function modify(req, res) {
  // * variables
  const { id } = req.params;

  // * output
  res.send(`Modifica parziale del post con indice ${id}`);
}

// # DESTROY
function destroy(req, res) {
  // * variables
  const id = parseInt(req.params.id);

  // * managing errors
  if (isNaN(id)) {
    const err = new Error("Id not valid");
    throw err;
  }

  if (id < 0) {
    const err = new Error("Id not found");
    throw err;
  }

  // * variables
  const deletedPost = postsData.find((post) => post.id === id);
  const postIndex = postsData.indexOf(deletedPost);

  // * managing errors
  if (postIndex === -1) {
    const err = new Error("Id not found");
    throw err;
  }

  postsData.splice(postIndex, 1);

  // * output
  console.log(postsData);
  res.status(200).json(postsData);
}

// # EXPORTS
module.exports = { index, show, store, update, modify, destroy };
