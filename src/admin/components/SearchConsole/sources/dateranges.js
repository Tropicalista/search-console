export default [
        { 
          period: '7',
          label: 'Last 7 days', 
          value: [
            { start: '7daysAgo', end: 'yesterday' },
            { start: '14daysAgo', end: '7daysAgo' }
          ] 
        },
        { 
          period: '14',
          label: 'Last 14 days', 
          value: [
            { start: '14daysAgo', end: 'yesterday' },
            { start: '28daysAgo', end: '14daysAgo' }
          ] 
        },
        { 
          period: '28',
          label: 'Last 28 days', 
          value: [
            { start: '28daysAgo', end: 'today' },
            { start: '56daysAgo', end: '28daysAgo' }
          ] 
        },
        { 
          period: '30',
          label: 'Last 30 days', 
          value: [
            { start: '30daysAgo', end: 'today' },
            { start: '60daysAgo', end: '30daysAgo' }
          ] 
        },
        { 
          period: '60',
          label: 'Last 60 days', 
          value: [
            { start: '60daysAgo', end: 'today' },
            { start: '120daysAgo', end: '60daysAgo' }
          ] 
        },

]