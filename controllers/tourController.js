const fs = require('fs');

const toursData = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: toursData.length,
    data: {
      tours: toursData,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const idInteger = req.params.id * 1; //To convert req.params from string to integer

  const tour = toursData.find((el) => el.id === idInteger);

  // if (idInteger > toursData.length - 1) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

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
        status: success,
        data: {
          tour: newTour,
        },
      });
    }
  );
};
exports.updateTour = (req, res) => {
  if (req.params.id > toursData.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

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
  if (req.params.id > toursData.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  let data = toursData.find(
    (el) => el.id === req.params.id
  );

  toursData.pop(data);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
