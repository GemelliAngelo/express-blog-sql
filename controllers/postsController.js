// * DATABASE INPORT
const connection = require("../db/data.js");

// # INDEX
function index(req, res) {
  // * variable
  const sql = "SELECT * FROM posts";

  // * query call
  connection.query(sql, (err, results) => {
    // managing error
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (!results.length) {
      return res.status(404).json({ error: "Not Found" });
    }

    // output
    res.json(results);
  });
}

// # SHOW
function show(req, res) {
  // * variables
  const id = parseInt(req.params.id);
  const sqlPost = "SELECT * FROM posts WHERE id= ?";

  connection.query(sqlPost, [id], (err, postResults) => {
    // * managing error
    if (isNaN(id)) {
      console.log(err);
      return res.status(400).json({ error: err });
    }

    let post = postResults[0];

    const sqlTags =
      "SELECT tags.* FROM tags INNER JOIN post_tag ON post_tag.tag_id=tags.id WHERE post_id= ?";

    connection.query(sqlTags, [id], (err, tagsResults) => {
      // * managing error
      if (isNaN(id)) {
        console.log(err);
        return res.status(400).json({ error: err });
      }

      // * output
      post.tags = tagsResults;

      res.json(post);
    });
  });
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
  const sql = "DELETE FROM posts WHERE id = ?";

  connection.query(sql, [id], (err, respons) => {
    // * managing errors
    if (isNaN(id) || id < 0) {
      console.log(err);
      return res.status(400).json({ error: err });
    }

    res.status(204);
  });
}

// # EXPORTS
module.exports = { index, show, store, update, modify, destroy };
