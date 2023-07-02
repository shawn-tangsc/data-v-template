import { useState, useCallback, useEffect, useRef, useImperativeHandle } from 'react'
import { debounce, observerDomResize } from './utils'
export default function useAutoResize(ref: any) {
  const [state, setState] = useState({ width: 0, height: 0 })
  const domRef = useRef(null);

  const setWH = useCallback(() => {
    const { clientWidth, clientHeight } = domRef.current || { clientWidth: 0, clientHeight: 0 }
    setState({ width: clientWidth, height: clientHeight })
    if (!domRef.current) {
      console.warn('无法获取dom 节点')
    } else if (!clientWidth || !clientHeight) {
      console.warn('组件宽高为0px')
    }
  }, [])

  useImperativeHandle(ref, () => ({ setWH }), [])
  useEffect(() => {
    const debounceSetWHFun = debounce(setWH, 100);
    debounceSetWHFun();
    const domObserver = observerDomResize(domRef.current, debounceSetWHFun)
    window.addEventListener('resize', debounceSetWHFun)
    return () => {
      window.removeEventListener('resize', debounceSetWHFun)
      if (!domObserver) {
        return
      }
      domObserver.disconnect()
      domObserver.takeRecords()
    }
  }, [])

  return { ...state, domRef, setWH }
}