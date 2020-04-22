import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {reactive, computed, createApp} from 'vue';
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const DemoGrid = {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  setup(props) {
    const state = reactive({
      sortKey: '',
      sortOrders: props.columns.reduce((o, key) => (o[key] = 1, o), {})
    });

    const filteredData = computed(() => {
      let { data, filterKey } = props;
      if (filterKey) {
        filterKey = filterKey.toLowerCase();
        data = data.filter(row => {
          return Object.keys(row).some(key => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }
      const { sortKey } = state;
      if (sortKey) {
        const order = state.sortOrders[sortKey];
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
  })
}).mount('#demo');
