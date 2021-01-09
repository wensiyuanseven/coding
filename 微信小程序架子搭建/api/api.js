import common from './common/api.js'
import find from './find/api.js'
import personalCenter from './personalCenter/api.js'
export default {
  ...common,
  ...find,
  ...personalCenter
}