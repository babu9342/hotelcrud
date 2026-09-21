import {configureStore} from "@reduxjs/toolkit";
import reducers from './hotel';

const store=configureStore({
    reducer:{hotels:reducers}
})

export default store;