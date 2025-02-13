<script setup lang="ts">
import { onMounted, ref } from "vue";
const theme = ref("light");
const themeService = window["devuiThemeService"];

const description = [
  "FTChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。",
  "作为AI模型，FTChat 提供的答案可能不总是确定或准确的，但您的反馈可以帮助 FTChat 做的更好。",
];
const introPrompt = {
  direction: "horizontal",
  list: [
    {
      value: "quickSort",
      label: "帮我写一个快速排序",
      iconConfig: { name: "icon-info-o", color: "#5e7ce0" },
      desc: "使用 js 实现一个快速排序",
    },
    {
      value: "helpMd",
      label: "你可以帮我做些什么？",
      iconConfig: { name: "icon-star", color: "rgb(255, 215, 0)" },
      desc: "了解当前大模型可以帮你做的事",
    },
    {
      value: "bindProjectSpace",
      label: "怎么绑定项目空间",
      iconConfig: { name: "icon-priority", color: "#3ac295" },
      desc: "如何绑定云空间中的项目",
    },
  ],
};
const simplePrompt = [
  {
    value: "quickSort",
    iconConfig: { name: "icon-info-o", color: "#5e7ce0" },
    label: "帮我写一个快速排序",
  },
  {
    value: "helpMd",
    iconConfig: { name: "icon-star", color: "rgb(255, 215, 0)" },
    label: "你可以帮我做些什么？",
  },
];
const startPage = ref(true);
const inputValue = ref("");
const inputFootIcons = [
  { icon: "icon-at", text: "智能体" },
  { icon: "icon-standard", text: "词库" },
  { icon: "icon-add", text: "附件" },
];

const messages = ref<any[]>([
  {
    from: "user",
    content: "你好",
  },
  {
    from: "model",
    content: "你好，我是 FTChat",
    id: "init-msg",
  },
]);

const newConversation = () => {
  startPage.value = true;
  messages.value = [];
};

import OpenAI from "openai";

const client = ref<OpenAI>();

client.value = new OpenAI({
  // chatgpt的apikey
  // apiKey: '', // 模型APIKey
  // baseURL: 'https://api.openai.com/v1', // 模型API地址
  // 硅基流动的apikey
  apiKey: "sk-kqkycrgulntjkzhfmsjiekfjkpwsbspohjerodqbxezorqms", // 模型APIKey
  baseURL: "https://api.siliconflow.cn/v1", // 模型API地址
  dangerouslyAllowBrowser: true,
});

const onSubmit = (evt: string) => {
  inputValue.value = "";
  startPage.value = false;
  // 用户发送消息
  messages.value.push({
    from: "user",
    content: evt,
    avatarConfig: { name: "user" },
  });

  fetchData(evt);
};

const fetchData = async (ques: string) => {
  messages.value.push({
    from: "model",
    content: "",
    avatarConfig: { name: "model" },
    id: "",
    loading: true,
  });
  const completion = await client.value!.chat.completions.create({
    model: "deepseek-ai/DeepSeek-V3", // 替换为自己的model名称
    messages: [{ role: "user", content: ques }],
    stream: true, // 为 true 则开启接口的流式返回
  });
  messages.value[messages.value.length - 1].loading = false;
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || "";
    const chatId = chunk.id;
    messages.value[messages.value.length - 1].content += content;
    messages.value[messages.value.length - 1].id = chatId;
  }
};

const themeChange = () => {
  if (themeService) {
    theme.value =
      themeService.currentTheme.id === "infinity-theme" ? "light" : "dark";
  }
};

onMounted(() => {
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add("themeChanged", themeChange);
  }
});
</script>

<template>
  <McLayout class="container">
    <McHeader
      :title="'FTChat'"
      :logoImg="'https://matechat.gitcode.com/logo.svg'"
    >
      <template #operationArea>
        <div class="operations">
          <i class="icon-helping"></i>
        </div>
      </template>
    </McHeader>
    <McLayoutContent
      v-if="startPage"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
      "
    >
      <McIntroduction
        :logoImg="'https://matechat.gitcode.com/logo2x.svg'"
        :title="'FTChat'"
        :subTitle="'Hi，欢迎使用 FTChat'"
        :description="description"
      ></McIntroduction>
      <McPrompt
        :list="introPrompt.list"
        :direction="introPrompt.direction"
        class="intro-prompt"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
    </McLayoutContent>
    <McLayoutContent class="content-container" v-else>
      <template v-for="(msg, idx) in messages" :key="idx">
        <McBubble
          v-if="msg.from === 'user'"
          :content="msg.content"
          :align="'right'"
          :avatarConfig="{
            imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg',
          }"
        >
        </McBubble>
        <McBubble
          v-else
          :content="msg.content"
          :avatarConfig="{ imgSrc: 'https://matechat.gitcode.com/logo.svg' }"
        >
          <McMarkdownCard
            :content="msg.content"
            :theme="theme"
          ></McMarkdownCard>
        </McBubble>
      </template>
    </McLayoutContent>
    <div class="shortcut" style="display: flex; align-items: center; gap: 8px">
      <McPrompt
        v-if="!startPage"
        :list="simplePrompt"
        :direction="'horizontal'"
        style="flex: 1"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
      <d-button
        style="margin-left: auto"
        icon="add"
        shape="circle"
        title="新建对话"
        size="sm"
        @click="newConversation"
      />
    </div>
    <McLayoutSender>
      <McInput
        :value="inputValue"
        :maxLength="2000"
        @change="(e) => (inputValue = e)"
        @submit="onSubmit"
      >
        <template #extra>
          <div class="input-foot-wrapper">
            <div class="input-foot-left">
              <span v-for="(item, index) in inputFootIcons" :key="index">
                <i :class="item.icon"></i>
                {{ item.text }}
              </span>
              <span class="input-foot-dividing-line"></span>
              <span class="input-foot-maxlength"
                >{{ inputValue.length }}/2000</span
              >
            </div>
            <div class="input-foot-right">
              <d-button
                icon="op-clearup"
                shape="round"
                :disabled="!inputValue"
                @click="inputValue = ''"
                >清空输入</d-button
              >
            </div>
          </div>
        </template>
      </McInput>
    </McLayoutSender>
  </McLayout>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  margin: 20px auto;
  height: calc(100vh - 150px);
  padding: 20px;
  gap: 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 16px;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
}

.input-foot-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-right: 8px;

  .input-foot-left {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 12px;
      color: #252b3a;
      cursor: pointer;
    }

    .input-foot-dividing-line {
      width: 1px;
      height: 14px;
      background-color: #d7d8da;
    }

    .input-foot-maxlength {
      font-size: 12px;
      color: #71757f;
    }
  }

  .input-foot-right {
    cursor: pointer;
    & > *:not(:first-child) {
      margin-left: 8px;
    }
  }

  .input-foot-right:hover {
    color: var(--primary-focus-color--);
  }
}
</style>
