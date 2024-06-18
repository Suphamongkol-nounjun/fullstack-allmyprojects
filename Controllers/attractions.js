const { pool } = require("../config/db");

exports.list = async (req, res) => {
  pool.query("SELECT * FROM attractions", (err, rows, fields) => {
    if (err) {
      // handle error
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(rows);
  });
};

exports.test = async (req, res) => {
  res.json({ msg: "hello attractions" });
};

exports.read = async (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM attractions WHERE id = ?",
    id,
    (err, rows, fields) => {
      if (err) {
        // handle error
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(rows);
    }
  );
}

exports.create = async (req, res) => {
  try {
    const attractionData = req.body;
    console.log(attractionData);

    const sql = 'INSERT INTO attractions SET ?';

    pool.query(sql, attractionData, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server Error');
      } else {
        console.log('Inserted attraction:', result.insertId);
        res.send(result);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;


    // สร้างคำสั่ง SQL UPDATE
    const sql = 'UPDATE attractions SET ? WHERE id = ?';

    // นำข้อมูลที่ต้องการอัปเดตและ ID มาใส่ใน values array
    const values = [updatedData, id];

    // ใช้ connection pool เพื่อเชื่อมต่อกับฐานข้อมูลและทำการ query
    pool.query(sql, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server Error');
      } else {
        console.log('Updated attractions:', id);
        res.send('Hello Update');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteAttraction = async (req, res) => {
  try {
    const id = req.params.id;

    // สร้างคำสั่ง SQL DELETE
    const sql = 'DELETE FROM attractions WHERE id = ?';

    // ใช้ connection pool เพื่อเชื่อมต่อกับฐานข้อมูลและทำการ query
    pool.query(sql, id, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server Error');
      } else {
        console.log('Deleted attractions:', id);
        res.send('Hello Delete');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};




// exports.create = async (req, res) => {
//   try {
//     console.log(req.body)
//     res.send('Hello Create')
//   } catch (error) {
//     console.log(error)
//     res.status(500).send('Server Error')
    
//   }
// }
