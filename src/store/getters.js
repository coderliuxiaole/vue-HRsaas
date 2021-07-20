const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userPhoto: state => state.user.userInfo.staffPhoto,
  userName: state => state.user.userInfo.username,
  companyId: state => state.user.userInfo.companyId
}
export default getters
