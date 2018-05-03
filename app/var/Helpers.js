import { browserHistory } from 'react-router';

export class Helpers{

    static redirect(url){
        browserHistory.push(url);
    }
}