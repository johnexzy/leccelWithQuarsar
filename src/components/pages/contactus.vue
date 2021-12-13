<template>
  <div class="content-wrapper">
    <div class="container-m">
      <div class="row">
        <div class="col-sm-12">
          <div
            class="card card-square"
            data-aos="fade-up">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-8 mb-5 mb-sm-2 border-right">
                  <h1 class="mt-5 text-center mb-5">Contact Us</h1>
                  <form>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <textarea
                            id="message"
                            class="form-control textarea"
                            placeholder="Comment *"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <input
                            id="name"
                            type="text"
                            class="form-control"
                            aria-describedby="name"
                            placeholder="Name *"
                          >
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="form-group">
                          <input
                            id="email"
                            type="email"
                            class="form-control"
                            aria-describedby="email"
                            placeholder="Email *"
                          >
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <a
                            href="#"
                            class="btn btn-lg btn-dark font-weight-bold mt-3"
                          >Send Message</a
                          >
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="col-lg-4 mb-5">
                  <h1 class="mt-5 text-center mb-5">Contact Us via</h1>
                  <div>
                    <i class="mdi mdi-24px mdi-email" />
                    <span class="text-muted display-4">admin@leccel.net</span>
                  </div>
                  <div>
                    <i class="mdi mdi-24px mdi-twitter" />
                    <span class="text-muted display-4">@leccelj</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactUs",
};
</script>
