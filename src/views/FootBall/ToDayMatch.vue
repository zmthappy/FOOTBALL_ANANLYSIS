<template>
  <div class="main-content">
    <div class="main-button">
      <div>
        <el-date-picker
          v-model="state.queryTime"
          type="date"
          placeholder="选择时间"
          size="default"
          value-format="YYYY-MM-DD"
          @change="searchTimeChange"
        />
      </div>
      <div>
        <el-button type="primary" @click="clearPredict">清除预测</el-button>
        <el-button type="primary" @click="getlist" :loading="state.cardRefresh"
          >重新获取</el-button
        >
      </div>
    </div>
    <div
      class="card-container"
      ref="cardFootballRef"
      v-loading="state.cardRefresh"
    >
      <div class="card" v-for="item in state.matchToday" :key="item.matchId">
        <div class="card-top-content">
          <!-- 对局对比 -->
          <div class="card-top-title">近六场比赛</div>
          <div class="flex-layout" style="align-items: flex-start">
            <div class="flex-layout base-message">
              <div class="card-team-name">{{ item.homeName }}</div>
              <div class="base-tema-information">
                <el-row>
                  <el-table
                    :data="item.tenMatchResultHome"
                    border
                    style="width: 100%"
                    :row-class-name="setRowClass"
                  >
                    <el-table-column
                      prop="amidithion"
                      label="赛果"
                      width="50"
                    />
                    <el-table-column
                      prop="leagueName"
                      label="联赛"
                      width="75"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="firstAsiaHandicap"
                      label="初盘"
                      width="80"
                    />
                    <el-table-column
                      prop="homeName"
                      label="对战双方"
                      show-overflow-tooltip
                    >
                      <template #default="scope"
                        >{{ scope.row.homeName }} --
                        {{ scope.row.awayName }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="fullResult" label="结果" width="60">
                      <template #default="scope">
                        <div style="font-size: 20px; color: #b8860b">
                          {{ scope.row.fullResult }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="matchTime" label="时间" width="90">
                    </el-table-column>
                  </el-table>
                </el-row>
                <div class="six-match-sumResult">
                  {{ item.matchResultHome }}
                  ({{ item.homeGOal }}) ({{ item.homeTeamType }})
                </div>
                <div class="six-match-sumResult">
                  {{ item.matchResultHomeresult }}
                </div>
              </div>
            </div>
            <div class="flex-layout base-message">
              <div class="card-team-name">{{ item.awayName }}</div>
              <div class="base-tema-information">
                <el-row>
                  <el-table
                    :data="item.tenMatchResultVisit"
                    border
                    style="width: 100%"
                    :row-class-name="setRowClass"
                  >
                    <el-table-column
                      prop="amidithion"
                      label="赛果"
                      width="50"
                    />
                    <el-table-column
                      prop="leagueName"
                      label="联赛"
                      width="75"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="firstAsiaHandicap"
                      label="初盘"
                      width="80"
                    />
                    <el-table-column
                      prop="homeName"
                      label="对战双方"
                      show-overflow-tooltip
                    >
                      <template #default="scope"
                        >{{ scope.row.homeName }} --
                        {{ scope.row.awayName }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="fullResult" label="结果" width="60">
                      <template #default="scope">
                        <div style="font-size: 20px; color: #b8860b">
                          {{ scope.row.fullResult }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="matchTime" label="时间" width="90">
                    </el-table-column>
                  </el-table>
                </el-row>
                <div class="six-match-sumResult">
                  {{ item.matchResultVisit }}
                  ({{ item.visitedGoals }})({{ item.awayType }})
                </div>
                <div class="six-match-sumResult">
                  {{ item.matchResultVisitresult }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-top-content">
          <!-- 对局对比 -->
          <div class="card-top-title">主客场近六场比赛</div>
          <div class="flex-layout" style="align-items: flex-start">
            <div class="flex-layout base-message">
              <div class="card-team-name">{{ item.homeName }}</div>
              <div class="base-tema-information">
                <el-row>
                  <el-table
                    :data="item.tenMatchResultInHome"
                    border
                    style="width: 100%"
                    :row-class-name="setRowClass"
                  >
                    <el-table-column
                      prop="amidithion"
                      label="赛果"
                      width="50"
                    />
                    <el-table-column
                      prop="leagueName"
                      label="联赛"
                      width="75"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="firstAsiaHandicap"
                      label="初盘"
                      width="80"
                    />
                    <el-table-column
                      prop="homeName"
                      label="对战双方"
                      show-overflow-tooltip
                    >
                      <template #default="scope"
                        >{{ scope.row.homeName }} --
                        {{ scope.row.awayName }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="fullResult" label="结果" width="60">
                      <template #default="scope">
                        <div style="font-size: 20px; color: #b8860b">
                          {{ scope.row.fullResult }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="matchTime" label="时间" width="90">
                    </el-table-column>
                  </el-table>
                </el-row>
                <div class="six-match-sumResult">
                  {{ item.matchResultHomeInhome }}
                  ({{ item.homeGOalInhome }})
                </div>
                <div class="six-match-sumResult">
                  {{ item.matchResultHomeInhomeresult }}
                </div>
              </div>
            </div>
            <div class="flex-layout base-message">
              <div class="card-team-name">{{ item.awayName }}</div>
              <div class="base-tema-information">
                <el-row>
                  <el-table
                    :data="item.tenMatchResultInVisit"
                    border
                    style="width: 100%"
                    :row-class-name="setRowClass"
                  >
                    <el-table-column
                      prop="amidithion"
                      label="赛果"
                      width="50"
                    />
                    <el-table-column
                      prop="leagueName"
                      label="联赛"
                      width="75"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="firstAsiaHandicap"
                      label="初盘"
                      width="80"
                    />
                    <el-table-column
                      prop="homeName"
                      label="对战双方"
                      show-overflow-tooltip
                    >
                      <template #default="scope"
                        >{{ scope.row.homeName }} --
                        {{ scope.row.awayName }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="fullResult" label="结果" width="60">
                      <template #default="scope">
                        <div style="font-size: 20px; color: #b8860b">
                          {{ scope.row.fullResult }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="matchTime" label="时间" width="90">
                    </el-table-column>
                  </el-table>
                  <!-- <el-col
                    class="base-match-resule"
                    :span="24"
                    v-for="matchItemAawy in item.tenMatchResultInVisit"
                    :key="matchItemAawy.matchId"
                  >
                    <div
                      class="single-match-value"
                      :class="
                        matchItemAawy.amidithion == '负'
                          ? 'single-match-lose'
                          : matchItemAawy.amidithion == '平'
                          ? 'single-match-draw'
                          : ''
                      "
                    >
                      <div>{{ matchItemAawy.amidithion }}</div>
                      <div>{{ matchItemAawy.leagueName }}</div>
                      <div>{{ matchItemAawy.firstAsiaHandicap }}</div>
                      <div>{{ matchItemAawy.homeName }}</div>
                      <div style="margin-left: 4px; margin-right: 4px">--</div>
                      <div>{{ matchItemAawy.awayName }}</div>
                      <div style="font-size: 20px; color: #b8860b">
                        {{ matchItemAawy.fullResult }}
                      </div>
                      <div>{{ matchItemAawy.matchTime }}</div>
                    </div>
                  </el-col> -->
                </el-row>
                <div class="six-match-sumResult">
                  {{ item.matchResultVisitVisor }}
                  ({{ item.visitedGoalInvisitor }})
                </div>
                <div class="six-match-sumResult">
                  {{ item.matchResultVisitVisorresult }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-top-content">
          <!-- 历史对战 -->
          <div class="card-top-title">历史近六场对战</div>
          <div
            class="flex-layout"
            style="align-items: flex-start; padding: 10px 80px"
          >
            <div class="flex-layout base-message" style="width: 100%">
              <div class="base-tema-information" style="width: 100%">
                <el-row>
                  <el-table
                    :data="item.historyMatchSix"
                    border
                    style="width: 100%"
                    :row-class-name="setRowClass"
                  >
                    <el-table-column
                      prop="amidithion"
                      label="赛果"
                      width="50"
                    />
                    <el-table-column
                      prop="leagueName"
                      label="联赛"
                      width="75"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="firstAsiaHandicap"
                      label="初盘"
                      width="80"
                    />
                    <el-table-column
                      prop="homeName"
                      label="对战双方"
                      show-overflow-tooltip
                    >
                      <template #default="scope"
                        >{{ scope.row.homeName }} --
                        {{ scope.row.awayName }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="fullResult" label="结果" width="60">
                      <template #default="scope">
                        <div style="font-size: 20px; color: #b8860b">
                          {{ scope.row.fullResult }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="matchTime" label="时间" width="90">
                    </el-table-column>
                  </el-table>
                </el-row>
                <div class="six-match-sumResult">
                  {{ item.hisotryResult }}
                  ({{ item.hisotryGoal }}) ({{ item.hisotrySixMatch }})
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-top-content">
          <!-- 机构分析 -->
          <div class="card-top-title">
            INSTITUTION分析【{{ item.leagueName }}】
          </div>
          <div class="flex-layout">
            <div class="flex-layout base-message">
              <div class="card-team-name">{{ item.homeName }}</div>
              <div class="base-tema-information">
                <el-form label-width="120px" label-suffix="-->">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="HOME排名">
                        <div
                          style="
                            font-size: 20px;
                            color: var(--primary-focus-color--);
                          "
                        >
                          {{ item.homeRank }}
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="IN主场排名">
                        <div>
                          {{ item.inHomeRank ? item.inHomeRank : "**" }}
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="两年排名">
                        <div>
                          {{
                            item.ThreeSeasonAverageHome
                              ? item.ThreeSeasonAverageHome
                              : "**"
                          }}
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div class="flex-layout base-message">
              <div class="card-team-name">{{ item.awayName }}</div>
              <div class="base-tema-information">
                <el-form label-width="120px" label-suffix="-->">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="AWAY排名">
                        <div
                          style="
                            font-size: 20px;
                            color: var(--primary-focus-color--);
                          "
                        >
                          {{ item.awayRank }}
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="IN客场排名">
                        <div>
                          {{ item.inAwayRank ? item.inAwayRank : "**" }}
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="两年排名">
                        <div>
                          {{
                            item.ThreeSeasonAverageAway
                              ? item.ThreeSeasonAverageAway
                              : "**"
                          }}
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
          </div>
          <div class="flex-layout">
            <div class="flex-layout base-message">
              <div class="base-tema-information">
                <el-form label-width="120px" label-suffix="-->">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="必发信息">
                        <div>{{ item.betWayList }}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="必发对比">
                        <div>{{ item.betWayInfor }}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="基础面信息">
                        <div>{{ item.baseTypeInformaion }}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="大小球">
                        <div>{{ item.bigsmall }}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div class="flex-layout base-message">
              <div class="base-tema-information">
                <el-form label-width="120px" label-suffix="-->">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="赛果">
                        <div
                          style="
                            color: var(--primary-focus-color--);
                            font-size: 24px;
                          "
                        >
                          {{ item.score[1]
                          }}<el-icon
                            :size="16"
                            style="cursor: pointer"
                            @click="copyTitle(item)"
                            ><DocumentCopy
                          /></el-icon>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="让球结果">
                        <div>{{ item.whoIsSrong }}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="预测结果">
                        <el-radio-group
                          v-model="item.prediceResult"
                          @change="(val) => predictchange(val, item)"
                        >
                          <el-radio :label="0">无</el-radio>
                          <el-radio :label="1">胜</el-radio>
                          <el-radio :label="2">平</el-radio>
                          <el-radio :label="3">负</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="预测结果">
                        <el-radio-group
                          v-model="item.prediceResultWho"
                          @change="(val) => prediceResultWhoChange(val, item)"
                        >
                          <el-radio :label="0">无</el-radio>
                          <el-radio :label="4">让胜</el-radio>
                          <el-radio :label="5">让平</el-radio>
                          <el-radio :label="6">让负</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="预测概率">
                        <el-radio-group
                          v-model="item.prediceResultPrecent"
                          @change="(val) => predictPrecentchange(val, item)"
                        >
                          <el-radio :label="0">+++</el-radio>
                          <el-radio :label="1">++</el-radio>
                          <el-radio :label="2">+</el-radio>
                          <el-radio :label="3">0</el-radio>
                          <el-radio :label="4">-</el-radio>
                          <el-radio :label="5">--</el-radio>
                          <el-radio :label="6">---</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div class="card-top-content">
          <!-- 盘口对比 -->
          <div class="card-top-title">PK对比</div>
          <div class="flex-layout">
            <div class="flex-layout base-message">
              <div class="base-tema-information">
                <el-form label-width="120px" label-suffix="-->">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="相同对手">
                        <div class="focus-font-style">
                          {{ item.subSameOpponentPK
                          }}{{
                            item.subSameOpponent
                              ? "-" + item.subSameOpponent
                              : ""
                          }}
                          {{
                            item.oppomnentTeamGapDays
                              ? "-" + item.oppomnentTeamGapDays + "天"
                              : ""
                          }}
                          <span style="font-size: 12px">
                            {{
                              item.oppomnentTeamVisiterHomeTime
                                ? "[主：" + item.oppomnentTeamVisiterHomeTime
                                : ""
                            }}{{
                              item.oppomnentTeamAwayTime
                                ? "==客：" + item.oppomnentTeamAwayTime + "]"
                                : ""
                            }}
                          </span>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="理论盘口">
                        <el-popover
                          placement="right"
                          title="上轮交锋信息"
                          :width="200"
                          trigger="hover"
                        >
                          <template #reference>
                            <div class="focus-font-style">
                              {{ item.theoryHandicap }}
                            </div>
                          </template>
                          <div>
                            <el-form label-width="80px" label-suffix=":">
                              <el-row>
                                <el-col :span="24">
                                  <el-form-item label="初盘">
                                    <div class="focus-font-style">
                                      {{ item["365ChuShangLun"] }}
                                    </div>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                  <el-form-item label="终盘">
                                    <div class="focus-font-style">
                                      {{ item["365ZOngShangLun"] }}
                                    </div>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                  <el-form-item label="时间">
                                    <div class="focus-font-style">
                                      {{ item["365MatchTimeShangLun"] }}
                                    </div>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                  <el-form-item label="PK定位">
                                    <div class="focus-font-style">
                                      {{ item["levelSubPositioning"] }}
                                    </div>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                  <el-form-item label="上轮主场">
                                    <div class="focus-font-style">
                                      {{ item["homeTeamShanglun"] }}
                                    </div>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                  <el-form-item label="上轮赛果">
                                    <div class="focus-font-style">
                                      {{ item["shangLunAmidithion"] }}
                                    </div>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                            </el-form>
                          </div>
                        </el-popover>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="排名盘口">
                        <div class="focus-font-style">
                          {{ item.TfinallyPk }}
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="各自主客定位">
                        <div class="focus-font-style">
                          {{ item.respectivePk }}
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="初始盘口">
                        <div class="focus-font-style">
                          {{ item["365First"] }}
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="变化盘口">
                        <div class="focus-font-style">{{ item["365End"] }}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div class="flex-layout base-message">
              <div class="base-tema-information">
                <el-form label-width="120px" label-suffix="-->">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="威廉">
                        <span class="start-pk"
                          >初：{{ item.firstoddswiilian }}</span
                        >
                        <span class="final-pk"
                          >变：{{ item.endoddswillian }}</span
                        >
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="立博">
                        <span class="start-pk"
                          >初：{{ item.firstoddslibo }}</span
                        >
                        <span class="final-pk">变：{{ item.endoddslibo }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="365">
                        <span class="start-pk"
                          >初：{{ item.firstodds365 }}</span
                        >
                        <span class="final-pk">变：{{ item.endodds365 }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="平博">
                        <span class="start-pk"
                          >初：{{ item.firstoddsPin }}</span
                        >
                        <span class="final-pk">变：{{ item.endoddsPin }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="澳门">
                        <span class="start-pk"
                          >初：{{ item.firstoddsaomen }}</span
                        >
                        <span class="final-pk"
                          >变：{{ item.endoddsaomen }}</span
                        >
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import dayjs from "dayjs";
import { useFootballStore } from "@/pinia/footballPinia";
import {
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import useClipboard from "vue-clipboard3";
import { splitFunc } from "@/utils/pulicUtils";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "toDayMatch",
  components: {},
  props: {},
  setup(props, { emit }) {
    const footballStore = useFootballStore();
    const { appContext } = getCurrentInstance();
    const cardFootballRef = ref(null);
    const { toClipboard } = useClipboard();
    const request = appContext.config.globalProperties.$https;
    const state = reactive({
      matchToday: [],
      predict: [],
      predictWho: [],
      predictPrecent: [],
      cardRefresh: false,
      queryTime: dayjs().format("YYYY-MM-DD"),
      tableOption: {
        currentPage: 1, //当前页
        pageSize: 50, //分页数
        pageSizes: [50, 100, 200, 300],
        total: 100, //总数
        tableSelectd: [], //选中的行数
      },
    });
    // 获取今日的数据
    async function getlist() {
      cardFootballRef.value.scroll({
        top: 0,
        behavior: "smooth",
      });
      state.cardRefresh = true;
      cardFootballRef.value.style = "overflow:hidden";
      let predictList = JSON.parse(localStorage.getItem("predict")) || [];
      let predictPrecent = JSON.parse(localStorage.getItem("predictTwo")) || [];
      let predictWho = JSON.parse(localStorage.getItem("predictWho")) || [];
      let res = await request.Post("/football", {
        queryTime: state.queryTime,
      });
      if (res.State) {
        res.Data.forEach((item) => {
          item.prediceResult = 0;
          item.prediceResultPrecent = 3;
          item.prediceResultWho = 0;
          for (const pItem of predictList) {
            if (pItem.matchId == item.matchId) {
              item.prediceResult = pItem.result;
            }
          }
          for (const pItem2 of predictPrecent) {
            if (pItem2.matchId == item.matchId) {
              item.prediceResultPrecent = pItem2.result;
            }
          }
          for (const pItem3 of predictWho) {
            if (pItem3.matchId == item.matchId) {
              item.prediceResultWho = pItem3.result;
            }
          }
        });
        state.matchToday = res.Data;
      }
      cardFootballRef.value.style = "";
      state.cardRefresh = false;
    }
    // 预测改变
    function predictchange(val, item) {
      let index = state.predict.findIndex((t) => t.matchId == item.matchId);
      if (index !== -1) {
        for (const prediceItem of state.predict) {
          if (prediceItem.matchId == item.matchId) {
            prediceItem.result = val;
          }
        }
      } else {
        state.predict.push({
          result: val,
          matchId: item.matchId,
        });
      }
      localStorage.setItem("predict", JSON.stringify(state.predict));
    }

    // 预测改变
    function prediceResultWhoChange(val, item) {
      let index = state.predictWho.findIndex((t) => t.matchId == item.matchId);
      if (index !== -1) {
        for (const prediceItem of state.predictWho) {
          if (prediceItem.matchId == item.matchId) {
            prediceItem.result = val;
          }
        }
      } else {
        state.predictWho.push({
          result: val,
          matchId: item.matchId,
        });
      }
      localStorage.setItem("predictWho", JSON.stringify(state.predictWho));
    }

    function predictPrecentchange(val, item) {
      let index = state.predictPrecent.findIndex(
        (t) => t.matchId == item.matchId,
      );
      if (index !== -1) {
        for (const prediceItem of state.predictPrecent) {
          if (prediceItem.matchId == item.matchId) {
            prediceItem.result = val;
          }
        }
      } else {
        state.predictPrecent.push({
          result: val,
          matchId: item.matchId,
        });
      }
      localStorage.setItem("predictTwo", JSON.stringify(state.predictPrecent));
    }

    // 清空缓存
    function clearPredict() {
      localStorage.clear();
    }
    // 重新获取
    function searchTimeChange() {
      getlist();
    }
    // 设置赛果不同的行样式
    function setRowClass({ row }) {
      let className = "single-match-lose";
      switch (row.amidithion) {
        case "负":
          className = "single-match-lose";
          break;
        case "胜":
          className = "single-match-win";
          break;
        case "平":
          className = "single-match-draw";
          break;
      }
      return className;
    }

    // 复制固定模版
    async function copyTitle(row) {
      await toClipboard(`请结合球队伤停和近六场的表现与亚盘大小球${row.bigsmall}和亚盘初始盘口${row.homeName}${row["365First"]}，
      退至${row.homeName}${row["365End"]}，给出今天${row.homeName}主场面对${row.awayName}的预测结果和比分预测`);
      ElMessage({
        message: "内容复制成功",
        type: "success",
      });
    }

    onMounted(() => {
      console.log(footballStore.test, "foot");
    });
    return {
      state,
      getlist,
      predictchange,
      clearPredict,
      searchTimeChange,
      setRowClass,
      cardFootballRef,
      predictPrecentchange,
      prediceResultWhoChange,
      copyTitle,
    };
  },
});
</script>
<style scoped lang="scss">
.main-content {
  margin-top: 8px;
  max-width: 1500px;
  flex: 0 0 1500px;
  height: 100%;

  .main-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

/* 卡片容器 */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: calc(100vh - 100px);
  overflow-y: auto;
  margin-top: 8px;
}

/* 卡片样式 */
.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 16px;
  border: 2px solid var(--secondary-assistant-color--);

  .card-top-content {
    padding: 10px 20px;
    border-bottom: 0.5px dashed var(--secondary-assistant-color--);

    .card-top-title {
      color: var(--primary-font-color--);
      text-align: center;
      font-size: 20px;
      margin-bottom: 8px;
      font-weight: bold;
    }

    .base-message {
      width: 50%;
      align-items: flex-start;

      .card-team-name {
        flex: 0 0 120px;
        text-align: right;
        line-height: 32px;
      }

      .base-tema-information {
        width: calc(100% - 145px);
        margin-left: 16px;

        .focus-font-style {
          font-size: 20px;
          color: var(--primary-focus-color--);
        }

        .final-pk {
          margin-left: 8px;
        }

        .six-match-sumResult {
          font-size: 24px;
          color: var(--primary-focus-color--);
        }

        .base-match-resule {
          line-height: 32px;

          .single-match-value {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: none;
            color: #ffffff;
            background-color: var(--secondary-assistant-color--);

            div {
              padding: 4px;
            }
          }

          .single-match-value:last-child {
            border-bottom: 1px solid #ffffff;
          }
        }
      }
    }

    .card-team-diver {
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  .card-top-content:last-child {
    border-bottom: none;
  }
}

.card:hover {
  transform: translateY(-5px);
  // box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* 卡片内容 */
.card-content {
  padding: 40px;

  .card-match-result {
    max-width: 800px;

    .card-match-home-six {
      width: 50%;
      display: flex;
      border-radius: 1px solid var(--secondary-assistant-color--);

      .card-match-home-six {
        margin-right: 4px;
      }
    }
  }
}

:deep(.el-form-item) {
  margin-bottom: 8px;
}

:deep(.el-radio) {
  margin-right: 8px;
}

:deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
  color: #ffffff;
  font-size: 14px;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
  background-color: var(--primary-focus-color--);
}
</style>
