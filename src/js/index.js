import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {reactive, computed, createApp} from 'vue';
let capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

let DemoGrid = {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  setup(props) {
    let state = reactive({
      sortKey: '',
      sortOrders: props.columns.reduce((o, key) => (o[key] = 1, o), {})
    });

    let filteredData = computed(() => {
      let { data, filterKey } = props;
      if (filterKey) {
        filterKey = filterKey.toLowerCase();
        data = data.filter(row => {
          return Object.keys(row).some(key => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }
      let { sortKey } = state;
      if (sortKey) {
        let order = state.sortOrders[sortKey];
        data = data.slice().sort((a, b) => {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    });

    function sortBy(key) {
      state.sortKey = key;
      state.sortOrders[key] *= -1;
    }

    return {
      state,
      filteredData,
      sortBy,
      capitalize
    };
  }
};
createApp({
  template: '#main',
  components: {
    DemoGrid
  },
  data: () => ({
    searchQuery: '',
    gridColumns: ['name', 'power'],
    gridData: [
      { name: 'Chuck Norris', power: Infinity },
      { name: 'Bruce Lee', power: 9000 },
      { name: 'Jackie Chan', power: 7000 },
      { name: 'Jet Li', power: 8000 }
    ]
  }),
  mounted() {
    console.log(111);
  }
}).mount('#demo');
