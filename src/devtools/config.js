import { configureStore } from '@reduxjs/toolkit'


const createEnhancers = (getDefaultEnhancers) => {
    if (__DEV__) {
        const reactotron = require("./ReactotronConfig").default
        return getDefaultEnhancers().concat(reactotron.createEnhancer())
    } else {
        return getDefaultEnhancers()
    }
}

export const store = configureStore({
    reducer: persistedReducer,
    enhancers: createEnhancers,
})