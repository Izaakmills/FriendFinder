
app.get("/api/friends", function(req, res) {
    connection.query("SELECT * FROM tasks;", function(err, data) {
      if (err) throw err;  
      res.render("index", { tasks: data });
    });
  });

  app.post("/api/friends", function(req, res) {
    connection.query("SELECT * FROM tasks;", function(err, data) {
      if (err) throw err;
      res.render("index", { tasks: data });
    });
  });