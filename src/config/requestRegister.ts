import Request from '@hotmart/request'

Request.register(`${process.env.API_ABTEST}/api/1/test`, {
  post: {
    'abtest.execute': '/:testId/execute?transactionRef=:transactionRef',
    'abtest.execute.segmentation': '/:testId/segmentation/:segmentation/execute',
    'abtest.convert': '/:testId/convert/:transactionRef'
  }
})
