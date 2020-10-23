export default [
    {
      name: 'keys',
      title: '',
      sortField: 'keys',
      titleClass: 'eight wide',
      callback: 'keyFormat',
      width: '50%'
    },
    {
      name: 'clicks',
      titleClass: 'two wide',
      sortField: 'clicks',
      width: '12.5%'
    },
    {
      name: 'impressions',
      titleClass: 'two wide',
      sortField: 'impressions',
      width: '12.5%'
    },
    {
      name: 'ctr',
      titleClass: 'two wide',
      sortField: 'ctr',
      callback: 'ctrFormat',
      width: '12.5%'
    },
    {
      name: 'position',
      titleClass: 'two wide',
      sortField: 'position',
      width: '12.5%'
    }
]