import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import store from './store'
import { Provider } from 'react-redux'
import 'normalize.css'
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
)
