export const filterNotes = model => model.aggregate([{
  $lookup: {
    from: 'categories',
    localField: 'category',
    foreignField: '_id',
    as: 'category'
  }
}, {
  $project: {
    category: { __v: 0 },
  }
}, { $unwind: '$category' },
{
  $lookup: {
    from: 'users',
    localField: 'author',
    foreignField: '_id',
    as: 'author'
  }
}, { $unwind: '$author' }, {
  $project: {
    author: {
      _id: 0,
      __v: 0,
      role: 0,
      verified: 0,
      imageUrl: 0,
      username: 0,
      password: 0,
      email: 0
    },
    __v: 0
  }
}]);

export const filterNote = (model) => {
  console.log(model);
};
