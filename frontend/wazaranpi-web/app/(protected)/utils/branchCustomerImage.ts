const branchImageIps: Record<string, string> = {
  "101": "172.16.3.5",
  "105": "172.16.9.5",
  "108": "172.16.24.5",
  "112": "172.16.20.5",
  "114": "172.16.21.5",
  "201": "172.16.5.5",
  "202": "172.16.19.5",
  "204": "172.16.14.5",
  "208": "172.16.25.5",
  "209": "172.16.23.5",
  "301": "172.16.7.5",
  "302": "172.16.16.5",
  "306": "172.16.17.5",
  "307": "172.16.26.5",
  "401": "172.16.18.5",
  "407": "172.16.15.5",
  "501": "172.16.13.5",
  "507": "172.16.22.5",
  "511": "172.16.27.5",
  "517": "172.16.12.5",
  "526": "172.16.28.5",
};

export function getCustomerImageUrl(branchCode: string, customerNo: string) {
  const ip = branchImageIps[branchCode];

  if (!ip || !customerNo) {
    return "";
  }

  return `http://${ip}/images/customer/${branchCode}-${customerNo}CR11.jpg`;
}
