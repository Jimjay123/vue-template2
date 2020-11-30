export default {
  methods: {
    getRouteToken () {
      if (this.$route.query.token) {
        const token = this.$route.query.token;
        window.sessionStorage.setItem('token', token);
      }
    }

  }

};
