import http from 'k6/http';
import { check, sleep, group } from 'k6';

const BASE = 'https://radionova.pro';
const VUS = Number(__ENV.VUS || 50);
const H = { 'Accept-Encoding': 'br, gzip', 'User-Agent': 'Mozilla/5.0 k6-loadtest' };

function assetsOf(html) {
  const set = new Set();
  const re = /(?:src|href)="(\/(?:_next\/static|portrait)[^"]+)"/g;
  let m;
  while ((m = re.exec(html))) set.add(m[1]);
  return [...set];
}

export const options = {
  scenarios: {
    crowd: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: VUS },
        { duration: '90s', target: VUS },
        { duration: '5s', target: 0 },
      ],
    },
  },
  batch: 6, batchPerHost: 6,
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{kind:html}': ['p(95)<1000'],
    'http_req_duration{kind:asset}': ['p(95)<1500'],
  },
  summaryTrendStats: ['avg', 'med', 'p(90)', 'p(95)', 'max'],
};

export default function () {
  group('home', () => {
    const r = http.get(BASE + '/', { headers: H, tags: { kind: 'html' } });
    check(r, { 'home 200': (x) => x.status === 200 });
    if (__ITER === 0 && r.status === 200) {
      const res = http.batch(assetsOf(r.body).map((p) => ['GET', BASE + p, null, { headers: H, tags: { kind: 'asset' } }]));
      res.forEach((x) => check(x, { 'asset 200': (y) => y.status === 200 }));
    }
  });
  sleep(5 + Math.random() * 10);
  if (Math.random() < 0.3) {
    const r = http.get(BASE + '/podcast', { headers: H, tags: { kind: 'html' } });
    check(r, { 'podcast 200': (x) => x.status === 200 });
    sleep(3 + Math.random() * 5);
  }
}
