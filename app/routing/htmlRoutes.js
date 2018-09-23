
app.get("/survey", function(req, res) {
    connection.query("SELECT * FROM tasks;", function(err, data) {
      if (err) throw err;  
      res.render("index", { tasks: data });
    });
  });

app.get("/survey", function(req, res) {
    connection.query("SELECT * FROM tasks;", function(err, data) {
      if (err) throw err;  
      res.render("index", { tasks: data });
    });
  });

