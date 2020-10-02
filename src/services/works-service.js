import ApiBase from './ApiBase'
import wordDocImageURL from '../../static/images/wordDoc.png'
import powerPointImageURL from '../../static/images/powerPoint.png'
import otherProjecImageURL from '../../static/images/otherProject.png'
import YoutubeService from './youtube-service';
import YoutubeImageURL from '../../static/images/youtube.png'

class WorksService {
    getWork(id) {
        return ApiBase.getRequest(`work/${id}`);
    }
    removeWork(id) {
        return ApiBase.postRequest(`work/remove`, { _id: id })
    }
    getPagedWorks(searchRequest) {
        return ApiBase.postRequest(`works/pagedWorks`, searchRequest)
    }
    saveWork(work) {
        return ApiBase.postRequest(`work/save`, work instanceof FormData ? work : { work })
    }
    getWordDocImageURL() {
        return wordDocImageURL;
    }
    getMostRecentWorks() {
        return ApiBase.getRequest(`works/recentworks`);
    }
    getPowerPointImageURL() {
        return powerPointImageURL;
    }
    getWorksDistinctYears() {
        return ApiBase.getRequest('works/distinctYears');
    }
    getOtherProjectImageURL() {
        return otherProjecImageURL;
    }
    getYoutubeImageURL() {
        return YoutubeImageURL;
    }
    getThumbnailURL(project) {
        switch(project.projectType) {
            case 'Y':
                return YoutubeService.getThumbnailUrl(project.sourceLink);
            case 'W':
                return this.getWordDocImageURL();
            case 'P':
                return this.getPowerPointImageURL();
            default:
                return this.getOtherProjectImageURL();
        }
    }
    getFile(workId) {
        return ApiBase.getRequest(`work/getFile/${workId}`);
    }
}

export default new WorksService();