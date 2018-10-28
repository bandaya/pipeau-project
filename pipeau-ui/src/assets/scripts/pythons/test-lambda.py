#compatible with Python 2 or 3
from __future__ import print_function
import time
import logging

def handler(event, context):
  #typical event for a python script:
  #{
  #  loglevel:
  # TODO : from event
  logger = logging.getLogger()
  logger.setLevel(logging.INFO)
  logger.info('got event {}'.format(event))
  logger.info('with context {}'.format(context))
  logger.error('something went wrong')
  count = 10
  while(count> 0):
    logger.info('sleeping 1 sec...')
    time.sleep(1)
    count-=1

  logger.info('done!')

  return 'Hello from Lambda!'
