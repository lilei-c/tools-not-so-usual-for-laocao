import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export const useVuex = (module) => {
    const store = useStore()
    const stateRefs = toRefs(computed(() => store.state[module]).value)
    const commit = (ci, payload) => store.commit(`${module}/${ci}`, payload)
    const dispatch = (ci, payload) => store.dispatch(`${module}/${ci}`, payload)
    const stateProxy = new Proxy(
        {},
        {
            get: (obj, stateProp) =>
                new Proxy(stateRefs[stateProp], {
                    get: function (obj, prop) {
                        return prop in obj ? obj[prop] : null
                    },
                    set: function (obj, prop, value) {
                        // console.log({ store, obj, prop })
                        store._withCommit(() => obj[prop] = value)
                        return true
                    },
                }),
        },
    )
    return {
        stateRefs,
        stateProxy, // 只是屏蔽了严格模式下的警告, 感觉并没啥用, 还不如直接用 stateRefs
        commit,
        dispatch,
    }
}
