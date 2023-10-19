import notifee, {
  AndroidNotificationSetting,
  AuthorizationStatus,
  TriggerType,
} from '@notifee/react-native';
import {ITriggerNotification} from '../types/interface';

const requestNotificationPermission = async () => {
  const result = await notifee.requestPermission();
  return result.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
};

const setNotificationCategories = async ({
  outingTitle,
  taskTitle,
}: {
  outingTitle: string;
  taskTitle: string;
}) => {
  await notifee.setNotificationCategories([
    {
      id: 'outing',
      actions: [
        {
          id: 'task-all-complete',
          title: outingTitle,
        },
      ],
    },
    {
      id: 'task',
      actions: [
        {
          id: 'task-complete',
          title: taskTitle,
        },
      ],
    },
  ]);
};

const setNotificationAndroid12 = async () => {
  const settings = await notifee.getNotificationSettings();

  if (settings.android.alarm === AndroidNotificationSetting.ENABLED) {
    return true;
  } else {
    await notifee.openAlarmPermissionSettings();
    return false;
  }
};

const createTriggerNotification = async ({
  title,
  body,
  dateTime,
  repeat,
  categoryId,
}: ITriggerNotification) => {
  const newDate = new Date(dateTime);

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Create a trigger notification
  const notificationId = await notifee.createTriggerNotification(
    {
      title: title,
      body: body,
      android: {
        channelId: channelId,
      },
      ios: {
        categoryId: categoryId,
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: newDate.getTime(),
      repeatFrequency: repeat,
      alarmManager: {
        allowWhileIdle: true,
      },
    },
  );

  await getTriggerNotificationIds();
  return notificationId;
};

const updateTriggerNotification = async (
  notificationId: string,
  triggerNotification: ITriggerNotification,
) => {
  await notifee.cancelNotification(notificationId);
  return await createTriggerNotification(triggerNotification);
};

const getTriggerNotificationIds = async () => {
  const notificationIds = await notifee.getTriggerNotificationIds();
  console.log('notificationIds:', notificationIds);

  return notificationIds;
};

const cancelNotification = async (notificationId: string) => {
  console.log('notificationId:', notificationId);

  await notifee.cancelNotification(notificationId);
  await getTriggerNotificationIds();
};

export {
  getTriggerNotificationIds,
  requestNotificationPermission,
  updateTriggerNotification,
  setNotificationAndroid12,
  createTriggerNotification,
  cancelNotification,
  setNotificationCategories,
};
