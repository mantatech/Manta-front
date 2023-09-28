import Vue from 'vue';
import Router from 'vue-router';
import ConsoleComponents from './components/ConsoleComponents.vue';
import AiModules from './components/AiModules.vue';
import DistributedDatasets from './components/DistributedDatasets.vue';
import NameServerList from './components/NameServerList.vue';
import Sessions from './components/Sessions.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/console-components',
    },
    {
      path: '/console-components',
      component: ConsoleComponents,
      children: [
        {
          path: '/ai-modules',
          component: AiModules,
        },
        {
          path: '/distributed-datasets',
          component: DistributedDatasets,
        },
        {
          path: '/name-server-list',
          component: NameServerList,
        },
        {
          path: '/sessions',
          component: Sessions,
        },
      ],
    },
  ],
});
