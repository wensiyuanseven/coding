module.exports = function(url, fileType) {
  if (fileType === 'VIDEO') {
    url = url.replace('http', 'https');
  }

  return new Promise((resolve, reject) => {

    wx.downloadFile({
      url: url,
      success: res => {
        if (res.statusCode === 200) {
          if (fileType == 'IMG') {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: res => {
                resolve();
              },
              fail: res => {
                //errMsg saveImageToPhotosAlbum: fail auth deny
                reject(res.errMsg);
              }
            })
          } else {
            wx.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success: res => {
                resolve();
              },
              fail: res => {
                reject(res.errMsg);
              }
            })
          }
        }
      },
      fail: res => {
        reject(res.errMsg);
      }
    })
  })
}