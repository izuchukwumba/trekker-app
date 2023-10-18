const fs = require('fs');

const toursData = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour is: ${val}`);

  if (parseInt(req.params.id) > toursData.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Operation failed',
      message: 'No name or price included',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: {
      tours: toursData,
    },
  });
};

exports.getTour = (req, res) => {
  const idInteger = req.params.id * 1; //To convert req.params from string to integer

  const tour = toursData.find((el) => el.id === idInteger);

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};
exports.createTour = (req, res) => {
  // console.log(req.body);

  const newId = toursData.length;
  const newTour = Object.assign({ id: newId }, req.body);
  toursData.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
exports.updateTour = (req, res) => {
  let particularTour = toursData.find(
    (el) => el.id == req.params.id
  );
  let fieldsToUpdate = req.body;
  console.log(req);
  for (const key in fieldsToUpdate) {
    if (key in particularTour) {
      particularTour[key] = fieldsToUpdate[key];
    }
  }

  res.json({
    status: 'success',
    data: {
      tour: particularTour,
    },
  });
};
exports.deleteTour = (req, res) => {
  let data = toursData.find(
    (el) => el.id === req.params.id
  );

  toursData.pop(data);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
