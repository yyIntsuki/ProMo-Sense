#include <Arduino.h>
#include <FirebaseClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include "hidden_configs.h"

void timeStatusCB(uint32_t &ts);
void printResult(AsyncResult &aResult);
void printError(int code, const String &msg);

DefaultNetwork network;                                                                           // initilize with boolean parameter to enable/disable network reconnection
ServiceAuth sa_auth(timeStatusCB, FIREBASE_CLIENT_EMAIL, FIREBASE_PROJECT_ID, PRIVATE_KEY, 3000); // expire period in seconds (<3600)

WiFiClientSecure ssl_client;

using AsyncClient = AsyncClientClass;
AsyncClient aClient(ssl_client, getNetwork(network));
AsyncResult aResult_no_callback;

FirebaseApp app;
RealtimeDatabase Database;

void setup()
{
    /* WiFi */
    Serial.begin(115200);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    Serial.println();
    Serial.println("Connecting to Wi-Fi");
    unsigned long ms = millis();
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(500);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    /* Firebase */
    Firebase.printf("Firebase Client v%s\n", FIREBASE_CLIENT_VERSION);
    Serial.println("Initializing app...");

    ssl_client.setInsecure();
    ssl_client.setBufferSizes(4096, 1024);

    initializeApp(aClient, app, getAuth(sa_auth), aResult_no_callback);
    authHandler();

    app.getApp<RealtimeDatabase>(Database);
    Database.url(FIREBASE_DB_URL);

    Serial.println("Synchronous Set... ");
    // Set int
    bool status = Database.set<int>(aClient, "/test/int", 12345);
    if (status)
        Serial.println("Set int is ok");
    else
        printError(aClient.lastError().code(), aClient.lastError().message());

    // Set bool
    status = Database.set<bool>(aClient, "/test/bool", true);
    if (status)
        Serial.println("Set bool is ok");
    else
        printError(aClient.lastError().code(), aClient.lastError().message());

    // Set string
    status = Database.set<String>(aClient, "/test/string", "hello");
    if (status)
        Serial.println("Set string is ok");
    else
        printError(aClient.lastError().code(), aClient.lastError().message());

    // Set json
    // Library does not provide JSON parser library, the following JSON writer class will be used with
    // object_t for simple demonstration.
    object_t json;
    JsonWriter writer;
    writer.create(json, "test/data", 123); // -> {"test":{"data":123}}
    // Or set the seialized JSON string to object_t as object_t("{\"test\":{\"data\":123}}")
    status = Database.set<object_t>(aClient, "/test/json", json);
    if (status)
        Serial.println("Set json is ok");
    else
        printError(aClient.lastError().code(), aClient.lastError().message());

    // Set array
    object_t arr;
    arr.initArray();                                                                                      // To use as Array placeholder
    writer.join(arr, 4, object_t(1), object_t(2), object_t(string_t("test")), object_t(boolean_t(true))); // -> [1,2,"test",true]
    // Or set the seialized JSON Array string to the object_t as object_t("[1,2,\"test\",true]")

    status = Database.set<object_t>(aClient, "/test/arr", arr);
    if (status)
        Serial.println("Set array is ok");
    else
        printError(aClient.lastError().code(), aClient.lastError().message());

    // Set float
    status = Database.set<number_t>(aClient, "/test/float", number_t(123.456, 2));
    if (status)
        Serial.println("Set float is ok");
    else
        printError(aClient.lastError().code(), aClient.lastError().message());

    // Set double
    status = Database.set<number_t>(aClient, "/test/double", number_t(1234.56789, 4));
    if (status)
        Serial.println("Set double is ok");
    else
        printError(aClient.lastError().code(), aClient.lastError().message());
}

void loop()
{
    authHandler();
    app.loop();
    Database.loop();
}

void authHandler()
{
    // Blocking authentication handler with timeout
    unsigned long ms = millis();
    while (app.isInitialized() && !app.ready() && millis() - ms < 120 * 1000)
    {
        // This JWT token process required for ServiceAuth and CustomAuth authentications
        JWT.loop(app.getAuth());
        printResult(aResult_no_callback);
    }
}

void timeStatusCB(uint32_t &ts)
{
    if (time(nullptr) < FIREBASE_DEFAULT_TS)
    {
        configTime(3 * 3600, 0, "pool.ntp.org");
        while (time(nullptr) < FIREBASE_DEFAULT_TS)
        {
            delay(100);
        }
    }
    ts = time(nullptr);
}

void printResult(AsyncResult &aResult)
{
    if (aResult.isEvent())
        Firebase.printf("Event task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.appEvent().message().c_str(), aResult.appEvent().code());
    if (aResult.isDebug())
        Firebase.printf("Debug task: %s, msg: %s\n", aResult.uid().c_str(), aResult.debug().c_str());
    if (aResult.isError())
        Firebase.printf("Error task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.error().message().c_str(), aResult.error().code());
}

void printError(int code, const String &msg)
{
    Firebase.printf("Error, msg: %s, code: %d\n", msg.c_str(), code);
}