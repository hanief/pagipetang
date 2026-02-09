import { View } from "react-native"
import Supplication from "./Supplication"
import Head from "expo-router/head"

export default function Index() {
  return (
    <>
      <Head>
        <script
          async
          src="https://analytics.algoritama.com/js/pa-flim1eufJUCP9hCpcNpY0.js"
        ></script>
        <script>
          window.plausible=window.plausible||function()
          {(plausible.q = plausible.q || []).push(arguments)}
          ,plausible.init=plausible.init||function(i){(plausible.o = i || {})};
          plausible.init()
        </script>
      </Head>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Supplication />
      </View>
    </>
  )
}
