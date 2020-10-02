class YoutubeService  {
    youtubeVideoIdExp =  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/

    getThumbnailUrl(videoUrl) {
        if(this.validateYoutubeUrl(videoUrl)) {
          let match = videoUrl.match(this.youtubeVideoIdExp);

          return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`
        }
    }

    validateYoutubeUrl(videoUrl) {
        if(videoUrl) {
            let matches = videoUrl.match(this.youtubeVideoIdExp);
            if (matches && matches[2].length == 11) {
              return true;
            } else {
              return false;
            } 
        }
        else
          return false;
    }

    getEmbedUrl(videoUrl) {
      if(videoUrl) {
        let videoId = videoUrl.match(this.youtubeVideoIdExp)[2];

        return `https://www.youtube.com/embed/${videoId}`;
      }
      else {
        return ''
      }
    }

}

module.exports = new YoutubeService();