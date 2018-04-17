//Imports
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
//Components
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBFjLDs6KGdteo9SMjEfBbXOPqhheUX4Xw';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            videos: [], 
            selectedVideo: null 
        };

        //default youtube search
        this.videoSearch('surfboards');
    }

    videoSearch (term) {
        YTSearch({key: API_KEY, term}, (videos) => {
            this.setState({
                videos, 
                selectedVideo: videos[0]
            });
        });
    }

    render () {
        const videoSearch = _.debounce(term => { this.videoSearch(term) }, 1000);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
            </div>
        )
    }
}

ReactDom.render(<App />, document.querySelector('.container'));
