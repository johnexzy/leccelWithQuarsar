<template>
  <div>
    <div 
      class="d-flex justify-content-center text-light text-center m-3" 
      data-aos="fade-down">
      <h3 class="text-uppercase font-weight-600 shadow">
        Get the Latest Movies, Music and Series for Free on Leccel.net
      </h3>
    </div>
    <ValidationObserver v-slot="{ passes }">
      <fieldset>
        <legend>ADD NEW COURSE</legend>
        <div 
          style="margin-bottom: 5px; border-radius: 5px" 
          class="container">
          <form @submit.prevent="passes(addCourse)">
            <ValidationProvider
              v-slot="{ errors }"
              name="skill"
              rules="required"
            >
              <label for="newcourse">Course:</label>
              <input
                v-model="coursename"
                name="newcourse"
                class="newcourse"
                type="text"
                placeholder="Write Course Code "
              >
              <div 
                v-for="(datum, i) in errors" 
                :key="i" 
                class="alert">
                <i>{{ datum }}</i>
              </div>
            </ValidationProvider>
            <br >
            <div style="margin-top: 1rem">
              <label for="newunit">Course Unit:&nbsp;</label>
              <input
                v-model="courseUnit"
                placeholder="2"
                type="number"
                class="newcourse"
                style="width: 40px"
              >
              <br>
              <div style="margin: 1rem 0">
                <label for="grade">Grade:&nbsp;</label>
                <select
                  id
                  v-model="grade"
                  style="
                    font-size: 1em;
                    width: 4rem;
                    background: #000000a8;
                    color: #fff;
                    "
                >
                  <option 
                    value="A" 
                    selected>A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>

              </div>
            </div>
            <div class="btnAddSec">
              <button 
                class="btnAdd" 
                type="submit" 
                @click="passes(addCourse)">
                <span style="font-weight:bold;font-size:16px;font-family:monospace">&plus;</span> COURSE
              </button>
            </div>
            
          </form>
        </div>

        <div id="display">
          <b>
            Current GPA:
            <span
              :class="{
                excellent: gpState(1),
                good: gpState(2),
                poor: gpState(4),
                fair: gpState(3),
              }"
            >{{ currentGp }}</span
            >
          </b>
        </div>
      </fieldset>
    </ValidationObserver>
    <table 
      v-if="courses.length > 0" 
      cellpadding="1px" 
      cellspacing="1px">
      <th>Course</th>
      <th>UNITS</th>
      <th>GRADE</th>
      <th>DELETE</th>
      <tr
        v-for="(data, index) in courses"
        :key="index"
      >
        <td 
          id="dept" 
          style="border: none">
          {{ data.coursename.toUpperCase() }}
        </td>
        <td>
          <input
            v-model="data.courseUnit"
            class="form-input"
            type="number"
            placeholder="Unit Load"
          >
        </td>
        <td>
          <select 
            v-model="data.grade" 
            class="select">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option 
              value 
              selected>Grade</option>
          </select>
        </td>
        <td
          style="
            text-align: center;
            display: grid;
            justify-items: center;
            padding-top: 5px;
          "
        >
          <!-- <i >&minus;</i> -->
          <img
            :style="removeStyle"
            src="./bad.png"
            alt="kokok"
            style="width: 40%; height: 30px"
            @click="remove(index)"
          >
        </td>
      </tr>
      <tr>
        <td style="border: none"/>
        <td 
          align="center" 
          style="border: none">
          <input
            id="button1"
            type="button"
            value="Calculate GP"
            @click="calcGp()"
          >
        </td>
        <td style="border: none"/>
      </tr>
    </table>
    <div class="holder">
      <p 
        v-if="courses.length == 0" 
        :style="{ color: '#3b5998' }">
        Please add some courses
      </p>
      <p 
        v-else-if="courses.length == 1" 
        :style="{ color: '#3b5998' }">
        You have {{ courses.length }} course
      </p>
      <p 
        v-else 
        :style="{ color: '#3b5998' }">
        You have {{ courses.length }} courses
      </p>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required",
});
export default {
  name: "Gp",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      bcolor: 0,
      coursename: "",
      courseUnit: 2,
      grade: "A",
      // gpstate:
      removeStyle: {
        color: "#fff",
        // backgroundColor: "#a10",
        borderRadius: "20px",
        width: "20px",
        height: "20px",
        textAlign: "center",
        fontWeight: "700",
        float: "right",
        cursor: "pointer",
      },

      courses: [],
      currentGp: 5.0,
    };
  },
  computed: {},
  watch: {
      grade(){
          this.calcGp()
      }
  },
  methods: {
    gpState(state) {
      var gp = this.currentGp;
      if (state == 1) {
        if (gp >= 4.5) return true;
        return false;
      }
      if (state == 2) {
        if (gp >= 3.5 && gp < 4.5) return true;
        return false;
      }
      if (state == 3) {
        if (gp >= 2.5 && gp < 3.5) return true;
        return false;
      }
      if (state == 4) {
        if (gp >= 0 && gp < 2.5) return true;
        return false;
      }
    },
    addCourse() {
      this.courses.unshift({
        coursename: this.coursename,
        courseUnit: this.courseUnit,
        grade: this.grade,
      });
      this.coursename = "";
      // console.log(this.courses);
      this.calcGp();
    },
    calcGp() {
      var arr = [],
        cumm = [];
      arr = this.courses;
      var totalUnit = 0,
        grade = 0,
        acc = 0,
        unit = 0;

      for (let i = 0; i < arr.length; i++) {
        unit = Number(arr[i].courseUnit);
        totalUnit = Number(arr[i].courseUnit) + totalUnit;
        switch (this.courses[i].grade) {
          case "A":
            grade = 5;
            break;
          case "B":
            grade = 4;
            break;
          case "C":
            grade = 3;
            break;
          case "D":
            grade = 2;
            break;
          case "E":
            grade = 1;
            break;
          case "F":
            grade = 0;
            break;

          default:
            grade = 0;
            break;
        }
        cumm.push(grade * unit);
      }
      acc = cumm.reduce((acc, elem) => acc + elem, 0);
      this.currentGp = totalUnit !== 0 ? (acc / totalUnit).toFixed(2) : 5.0;
    },
    remove(id) {
      this.courses.splice(id, 1);
      this.calcGp();
    //   this.currentGp = totalUnit == 0 ? 5 : this.currentGp;
    },
  },
};
</script>
<style scoped>
table {
    margin: 0 auto;
    border-radius: 10px;
    /* width: calc(100% - 40px); */
    background: hsla(42, 78%, 78%, 0.96);
}

th,
td {
    vertical-align: top;
    text-align: center;
}

#display {
    width: 80%;
    height: 40px;
    padding: 10px;
    margin: 10px auto;
    text-align: center;
    font-family: cursive;
    /* background: #000000; */
    color: rgb(0, 0, 0);
}

.excellent {
    /* text-shadow: 0px 0px 20px gold; */
    color: gold;
}

.fair {
    /* text-shadow: 0px 0px 20px rgb(122, 140, 223); */
    color: rgb(122, 140, 223);
}

.good {
    /* text-shadow: 0px 0px 20px blue; */
    color: blue;
}

.poor {
    /* text-shadow: 0px 0px 20px red; */
    color: red;
}

.form-input {
    display: inline-block;
    width: 60%;
    height: 25px;
    margin: auto;
    border: none;
}

#button {
    margin: 7px;
    width: 200px;
    height: auto;
    background: #066;
    color: #fff;
    left: 0;
}

#button1 {
    margin: 3px;
    width: auto;
    height: 36px;
    background: rgb(0, 36, 102);
    color: #fff;
    font-weight: 700;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
}

.select {
    border: none;
    border-radius: 3px;
    background: #8c7771;
    height: 30px;
    display: inline-block;
    margin: auto;
}

form {
    padding: 20px;
}

fieldset {
    margin-bottom: 20px;
    border-radius: 4px;
}

legend {
    font-weight: 800;
}
.btnAddSec{
    display: flex;
    justify-content: center;
    align-content: center;
}
.btnAdd {
    width: 100px;
    height: 33px;
    background-color: #3d4dad;
    box-shadow: 1px 1px 2px 0px black;
    outline: none;
    border: 0;
    border-radius: 3px;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
}

    .btnAdd:hover {
        box-shadow: 1px 3px 4px 0px black;
    }

.newcourse {
    border: 0;
    border-bottom: 2px solid;
    background: transparent;
    color: #000000;
    width: 80%;
    padding: 5px;
    font-size: 0.8em;
    text-transform: uppercase;
}

    .newcourse:focus {
        border: 0;
        outline: none;
        border-bottom: 2px solid rgb(0, 0, 5);
    }

.holder {
    background: rgba(255, 255, 255, 0.384);
    padding-bottom: 1px;
}

p {
    text-align: center;
    margin: 30px 0;
    color: gray;
}

.alert {
    font-size: 12px;
    color: rgb(255, 26, 26);
    background-color: #d0cdbd96;
    padding: 0 10px;
    font-weight: 800;
}

.container {
    box-shadow: 0px 0px 40px rgb(255, 255, 255);
}

</style>